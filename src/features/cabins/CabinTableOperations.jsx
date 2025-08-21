/* eslint-disable no-unused-vars */
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"
import TableOperations from "../../ui/TableOperations"

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter filterField="discount"
             Options=
             {[{value:"all",label:"All"},
                {value:"no-discount",label:"No Discount"},
                {value:"with-discount",label:"with Discount"}
            ]} />
            <SortBy Options=
             {[{value:"name-asc",label:"Sort name(A-Z)"},
                {value:"name-desc",label:"Sort name(Z-A)"},
                {value:"regularPrice-asc",label:"price(low first)"},
                {value:"regularPrice-desc",label:"price(high first)"},
                {value:"maxCapacity-asc",label:"Capacity(low first)"},
                {value:"maxCapacity-desc",label:"Capacity(high first)"},
            ]}/>
        </TableOperations>
    )
}

export default CabinTableOperations
