# src/store_visitor/app.py
import json
import boto3
import uuid
from datetime import datetime

# Initialize DynamoDB client
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("VisitorCount")


def lambda_handler(event, context):
    # Generate a unique visitor ID
    visitor_id = str(uuid.uuid4())
    # Get the current timestamp
    timestamp = str(datetime.utcnow().isoformat())

    # Store the visit in DynamoDB
    try:
        table.put_item(Item={"VisitorId": visitor_id, "Timestamp": timestamp})
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",  # Required for CORS support to work
                # Required for cookies, authorization headers with HTTPS
                "Access-Control-Allow-Credentials": True,
            },
            "body": json.dumps("Visitor recorded successfully."),
        }
    except Exception as e:
        print(e)
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",  # Required for CORS support to work
                "Access-Control-Allow-Credentials": True,
            },
            "body": json.dumps("Error saving the visitor."),
        }
