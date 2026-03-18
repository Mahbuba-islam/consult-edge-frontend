import { Navbar } from "@/components/Navbar1";
import Footer from "@/components/ui/Footer";

export default function CommonLaout({children}: {children : React.ReactNode}){
    return(
        <div>
              <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    )
}