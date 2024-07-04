export const ssmInlinePolicy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "SSMGetParameter",
            "Effect": "Allow",
            "Action": [
                "ssm:GetParameter",
                "ssm:GetParameters",
                "ssm:PutParameter",
                "ssm:DeleteParameter",
                "ssm:DescribeParameters"
            ],
            "Resource": "*"
        }
    ]
}