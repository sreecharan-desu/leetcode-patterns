import { createClient } from "redis";
const client = createClient();


async function connectRedis() {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.error("Error connecting to Redis:", error);
    }
}

connectRedis();


async function getSubmission() {


while(true) {
    try {
        const submission = await client.brPop("submissions", 0);
        if (submission) {
            console.log("Submission received:", submission);
        } else {
            throw new Error("Submission not found");
        }
    } catch (error) {
        console.error("Error fetching submission:", error);
        throw error;
    }
}

}


getSubmission()
