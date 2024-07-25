import WarnAlert from "@/components/custom/alerts/WarnAlert";
import { Info } from "lucide-react";
import { folderStructure } from "../constants/codeSnippets";
import Section from "../components/Section";
import SectionWithCode from "../components/SectionWithCode";

const PyFiles = () => {
    return (
        <div className="space-y-6">

            <Section title="Upload Python Files">
                <p className="text-muted-foreground text-sm">
                    To execute Python scripts in Brender Studio, you can upload Python files in two ways:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground text-sm">
                    <li>
                        <strong>Single Python File:</strong> Upload a single Python file with the script.
                    </li>
                    <li>
                        <strong>Folder with Files:</strong> Upload a folder containing all files required by the script.
                    </li>
                </ul>
            </Section>

            <SectionWithCode title="Example folder structure" language="yml" code={folderStructure}>
                <p className="text-muted-foreground text-sm">
                    User must specify the main script file to be executed. In the example above, the main script is <code>main_script.py</code>.
                </p>
            </SectionWithCode>

            <WarnAlert
                className="text-white"
                variant="info"
                icon={<Info size={16} />}
                title="Note"
                description="The folder must contain all folders, subfolders, and files required by the main script. Brender Studio Docker image will set the PYTHONPATH to the folder containing the main script."
            />

            {/* <SectionWithCode title="Setup example inside AWS Batch container before executing Blender in Background" language="python" code={pythonPathEnv} /> */}

            {/* <Section title="Explanation">
                <p className="text-muted-foreground text-sm">
                    The example script above sets the <code>PYTHONPATH</code> to include the project directory and site-packages. The <code>efs_project_path</code> is the path to the project directory in the AWS EFS volume. The <code>python_site_packages</code> is the path to the Python site-packages directory.
                    This ensures that the Python interpreter can find the required modules and packages in the project directory and site-packages.
                </p>
            </Section> */}

        </div>
    )
}

export default PyFiles;
