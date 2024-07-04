import CustomTabs from '@/components/custom/tabs/CustomTabs'
import ListInstances from './list-instances/ListInstances';
import ListAutoscaling from './auto-scaling/ListAutoscaling';

const Ec2Section = () => {

    const tabs = [
        { value: "ec2", label: "EC2 Instances", content: <ListInstances /> },
        { value: "auto-scaling", label: "Auto Scaling", content: <ListAutoscaling /> }
    ];


    return (
        <div>
            <CustomTabs tabs={tabs} />
        </div>
    )
}

export default Ec2Section