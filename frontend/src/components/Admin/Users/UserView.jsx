import {useNavigate} from "react-router-dom";
import {Avatar, Button, Typography} from "@material-tailwind/react";
import CustomTable from "@components/CustomTable.jsx";

// eslint-disable-next-line react/prop-types
function UserView({ employee, packages }) {

    const navigate = useNavigate();

    if(packages.packages == null)
    {
        return;
    }

    console.log(packages)

    console.log(employee)

    return (
        <section className="p-10 w-3/4 mx-auto rounded-2xl bg-white shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar src={employee.photo} alt="user" size="lg" />
                    <div>
                        <Typography variant="h6">{employee.firstName} {employee.lastName}</Typography>
                        <Typography variant="small">
                            {employee.email}
                        </Typography>
                    </div>
                </div>
            </div>
            <CustomTable
                data={packages.packages}
                header="Packages"
                subHeader="List of packages"
                onRowAction={(rowId) => {
                    navigate(`/employee/package/${rowId}`);
                }}
            />
        </section>
    );
}

export default UserView;