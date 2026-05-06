import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };


const cleanUrl = env.databaseUrl.split('?')[0];

let instance: any;

export function getDb() {
  if (!instance) {
    
    const poolConnection = mysql.createPool({
      uri: cleanUrl,
      ssl: {
        rejectUnauthorized: true,
      },
      
    });

    instance = drizzle(poolConnection, {
      schema: fullSchema,
      mode: "planetscale", 
    });
  }
  return instance;
}

export const db = getDb();