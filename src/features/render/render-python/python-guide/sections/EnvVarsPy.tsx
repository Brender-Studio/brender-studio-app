import Section from "../components/Section"

const EnvVarsPy = () => {
    return (
        <div className="space-y-6">
            <Section title="Environment Variables">
                <p className='text-muted-foreground text-sm'>
                    Environment variables are a way to pass information to the scripts that are running in the AWS Batch container. This is useful for passing configuration values, such as project name, output folder path, etc., to the scripts.
                </p>
                <p className='text-muted-foreground text-sm'>
                    Users can set custom environment variables in the Brender Studio form, which can be accessed in the Python scripts using the <code>os.environ.get()</code> method.
                </p>
            </Section>
            <Section title="Example of setting and accessing environment variables in Python">
                <ul className="space-y-2 list-disc pl-6 text-sm text-muted-foreground">
                    <li><code>PROJECT_NAME=MyProject</code></li>
                    <li><code>BLENDER_OUTPUT_FOLDER_PATH=/mnt/efs/projects/MyProject/output</code></li>
                </ul>
            </Section>

            <Section title="Accessing environment variables in Python script">
                <ul className="list-disc pl-6 text-sm text-muted-foreground">
                    <li><code>print(os.environ.get('PROJECT_NAME'))</code></li>
                    <li><code>print(os.environ.get('BLENDER_OUTPUT_FOLDER_PATH'))</code></li>
                </ul>
            </Section>

            <Section title="Output">
                <ul className="list-disc pl-6 text-sm text-muted-foreground">
                    <li><code>MyProject</code></li>
                    <li><code>/mnt/efs/projects/MyProject/output</code></li>
                </ul>
            </Section>


            <Section title="Check Form Envs before running the job">
                <p className="text-sm text-muted-foreground">
                    You can check the environment variables set in the Brender Studio form before running the job. This can help you verify that the correct values are being passed to the Python scripts. You can also set custom environment variables in the form to pass additional information to the scripts.
                </p>
            </Section>

        </div>
    )
}

export default EnvVarsPy