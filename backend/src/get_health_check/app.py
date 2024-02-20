import json


def lambda_handler(event, context):
    # Return a simple `True` response if API is online
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
        },
        "body": json.dumps(
            {"status": "success", "message": "API is online.", "data": True}
        ),
    }
