/* global URLSearchParams */
import { useSearchParams } from "react-router-dom"
import Select from "./Select"
function SortBy({Options}) {
    const[searchParams,setSearchParams]=useSearchParams();
    const sortBy=searchParams.get('sortBy')||"";
    function handelChange(e) {
      const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set("sortBy", e.target.value);
  setSearchParams(newSearchParams.toString());
    }
    return (
        <Select Options={Options} value={sortBy} onChange={handelChange}/>
    )
}

export default SortBy
