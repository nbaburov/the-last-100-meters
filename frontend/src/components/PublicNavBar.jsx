/* eslint-disable react/prop-types */
import React from "react";
import {
	Navbar,
	Collapse,
	Typography,
	Button,
	IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavItem({ label, href }) {
	return (
		<a href={href}>
			<Typography as="li" color="blue-gray" className="p-1 font-medium">
				{label}
			</Typography>
		</a>
	);
}

function NavList() {
	return (
		<ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
			<NavItem label="HomePage" href="/" />
			<NavItem label="Scan Package" href="/scan" />
			{/* Demo pages, Will Remove later */}
			{/*<NavItem label="Demo: Mapping" href="/demo/mapping" />*/}
			{/*<NavItem label="Demo: Employee Screens" href="/employee?id=1" />*/}
		</ul>
	);
}

export function PublicNavBar() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);

	React.useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpen(false)
		);
	}, []);

	return (
		<Navbar color="transparent" fullWidth>
			<div className="container mx-auto flex items-center justify-between text-blue-gray-900">
				<Typography
					as="a"
					href="/"
					color="blue-gray"
					className="mr-4 cursor-pointer text-lg font-bold"
				>
					Office System
				</Typography>
				<div className="hidden lg:block">
					<NavList />
				</div>
				<a href="/signin">
					<Button color="gray" className="hidden lg:inline-block">
						Sign in
					</Button>
				</a>
				<IconButton
					size="sm"
					variant="text"
					color="blue-gray"
					onClick={handleOpen}
					className="ml-auto inline-block text-blue-gray-900 lg:hidden"
				>
					{open ? (
						<XMarkIcon className="h-6 w-6" strokeWidth={2} />
					) : (
						<Bars3Icon className="h-6 w-6" strokeWidth={2} />
					)}
				</IconButton>
			</div>
			<Collapse open={open}>
				<div className="mt-2 rounded-xl bg-white py-2">
					<NavList />
					<a href="/signin">
						<Button className="mb-2" fullWidth>
							Sign in
						</Button>
					</a>
				</div>
			</Collapse>
		</Navbar>
	);
}

export default PublicNavBar;
