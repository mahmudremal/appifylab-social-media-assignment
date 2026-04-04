import Buddies from "./rightsidebar/Buddies";
import YouMayLike from "./rightsidebar/YouMayLike";

export default function RightSidebar() {
    return (
        <div className="_layout_right_sidebar_wrap">
            <div className="_layout_right_sidebar_inner">
                <YouMayLike />
            </div>
            <div className="_layout_right_sidebar_inner">
                <Buddies />
            </div>
        </div>

    )
}