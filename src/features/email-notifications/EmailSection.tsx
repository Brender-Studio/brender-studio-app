import CustomTabs from "@/components/custom/tabs/CustomTabs";
import ListIndentities from "./identities/ListIndentities";
import ListTemplates from "./templates/ListTemplates";

const EmailSection = () => {

    const tabs = [
        { value: "identities", label: "Identities", content: <ListIndentities /> },
        { value: "templates", label: "Templates", content: <ListTemplates /> }
    ];

    return (
        <div>
            <CustomTabs tabs={tabs} />
        </div>
    )
}

export default EmailSection