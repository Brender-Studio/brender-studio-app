export const cdkInlinePolicy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "assumerole",
            "Effect": "Allow",
            "Action": [
                "sts:AssumeRole",
                "iam:PassRole"
            ],
            "Resource": [
                "arn:aws:iam::*:role/cdk-*-deploy-role-*",
                "arn:aws:iam::*:role/cdk-*-file-publishing-*",
                "arn:aws:iam::*:role/cdk-*-image-publishing-role-*",
                "arn:aws:iam::*:role/cdk-*-lookup-role-*"
            ]
        }
    ]
}