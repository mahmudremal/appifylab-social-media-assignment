import Explore from "./leftsidebar/Explore";
import SuggestedEvents from "./leftsidebar/SuggestedEvents";
import SuggestedPeople from "./leftsidebar/SuggestedPeople";

export default function LeftSidebar() {

    return (

        <div className="_layout_left_sidebar_wrap">
            <div className="_layout_left_sidebar_inner">
                <Explore />
            </div>
            <div className="_layout_left_sidebar_inner">
                <SuggestedPeople />
            </div>
            <div className="_layout_left_sidebar_inner">
                <SuggestedEvents />
            </div>
        </div>

    )
}