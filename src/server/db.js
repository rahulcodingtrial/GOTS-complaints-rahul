import { MongoClient, GridFSBucket } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER || 'RahulTrialAdmin';
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || '';
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER || 'gots-trial.jfoz0n7.mongodb.net';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'gots_complaints';
const MONGODB_APP_NAME = process.env.MONGODB_APP_NAME || 'GOTS-Complaints';

const password = encodeURIComponent(MONGODB_PASSWORD);
const MONGO_URI = `mongodb+srv://${MONGODB_USER}:${password}@${MONGODB_CLUSTER}/?appName=${MONGODB_APP_NAME}&retryWrites=true&w=majority`;
const DB_NAME = MONGODB_DATABASE;
const COLLECTION_NAME = 'complaints';

let client = null;
let db = null;
let gridFSBucket = null;
let connectionError = null;

export async function connectDB() {
  if (client) {
    return db;
  }

  if (connectionError) {
    throw connectionError;
  }

  try {
    console.log('Attempting to connect to MongoDB...');
    client = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    await client.connect();
    db = client.db(DB_NAME);
    gridFSBucket = new GridFSBucket(db);
    console.log('Connected to MongoDB Atlas');
    return db;
  } catch (error) {
    connectionError = error;
    console.error('Failed to connect to MongoDB:', error.message);
    throw error;
  }
}

export function getGridFSBucket() {
  if (!gridFSBucket) {
    throw new Error('GridFS bucket not initialized. Call connectDB first.');
  }
  return gridFSBucket;
}

export async function insertComplaint(complaintData) {
  if (!db) {
    await connectDB();
  }

  try {
    const collection = db.collection(COLLECTION_NAME);
    const complaint = {
      ...complaintData,
      submittedAt: new Date(),
      status: 'submitted',
    };
    const result = await collection.insertOne(complaint);
    console.log(`Inserted complaint: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error('Error inserting complaint:', error);
    throw error;
  }
}

export async function getComplaint(id) {
  if (!db) {
    await connectDB();
  }

  try {
    const collection = db.collection(COLLECTION_NAME);
    return await collection.findOne({ _id: new (await import('mongodb')).ObjectId(id) });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    throw error;
  }
}

export async function closeDB() {
  if (client) {
    await client.close();
    console.log('Closed MongoDB connection');
  }
}
