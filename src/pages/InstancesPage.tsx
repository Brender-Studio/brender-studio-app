import Ec2HoverCard from "@/components/custom/hover-card-pages/Ec2HoverCard"
import Section from "@/components/custom/structure/Section"
import Ec2Section from "@/features/instances/Ec2Section"

const InstancesPage = () => {
   
    return (
        <Section
            title="Servers - EC2 Instances"
            justify="start"
            backBtn={false}
            content={<Ec2Section />}
            hover_card_content='Here you can view the EC2 instances and Auto Scaling Groups in the selected region. You can view the instance details and terminate the instances.'
            hover_card_title='Servers - EC2 Instances'
            hover_card_children={<Ec2HoverCard />}
        />
    )
}

export default InstancesPage