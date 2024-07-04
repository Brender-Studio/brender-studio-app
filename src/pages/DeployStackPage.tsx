import Section from "@/components/custom/structure/Section"
import FormDeployStack from "@/features/stacks/deploy-stack/form-deploy/FormDeployStack"

const DeployStackPage = () => {
  return (
    <Section
      title="Deploy Brender Studio Farm"
      tooltip_description="This section allows you to deploy a Brender Studio Farm. You can deploy a new stack using the form below. Brender Studio utilizes CDK/CloudFormation for defining infrastructure as code."
      justify="start"
      backBtn={true}
      content={<FormDeployStack />}
    />
  )
}

export default DeployStackPage