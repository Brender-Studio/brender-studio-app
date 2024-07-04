export const cdkBootstrapInlinePolicy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:*",
                "iam:*",
                "ecr:*",
                "s3:*"
            ],
            "Resource": "*"
        }
    ]
}