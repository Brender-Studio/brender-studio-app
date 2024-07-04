import { exampleCode } from "../constants/codeSnippets"
import Section from "../components/Section"
import SectionWithCode from "../components/SectionWithCode"

const PythonBlender = () => {

    return (
        <div className="space-y-6">
            <Section title="Python and Blender">
                <p className='text-muted-foreground text-sm'>
                    Python is used to automate and customize tasks within Blender using the <code>bpy</code> API.
                    Python scripts can perform actions such as creating objects, animations, material modifications, and more.
                </p>
            </Section>

            <SectionWithCode title="Example Python Script" language="python" code={exampleCode} />
            <Section title="Explanation">
                <p className='text-muted-foreground text-sm'>
                    The example script above renders a scene from multiple cameras.
                    The script sets the output path to the environment variable <code>EFS_BLENDER_OUTPUT_FOLDER_PATH</code> or defaults to <code>/output</code>.
                    The script iterates through all objects in the scene and sets the camera to the current object.
                    The script then sets the render file path to the output path and renders the scene.
                </p>
            </Section>
        </div>
    )
}

export default PythonBlender