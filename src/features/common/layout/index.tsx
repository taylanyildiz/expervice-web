import { Outlet } from "react-router-dom";
import CommonAppBar from "./components/CommonAppBar";
import CommonFooter from "./components/CommonFooter";
import { useRef } from "react";

function CommonPage() {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <CommonAppBar />
            <div ref={ref}>
                <Outlet />
            </div>
            <CommonFooter scrollRef={ref} />
        </>
    )
}

export default CommonPage;