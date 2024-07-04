import NoStackSelected from "@/components/custom/no-data/NoStackSelected";
import RenderBucketContents from "../bucket-contents/RenderBucketContents"
import { useUserSessionStore } from "@/store/useSessionStore";

const ListRenders = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentStack } = getSessionData();

    return (
        <div>
            {
                currentStack ? (
                    <div>
                        <RenderBucketContents />
                    </div>
                ) : (
                    <NoStackSelected />
                )
            }
        </div>
    )
}

export default ListRenders