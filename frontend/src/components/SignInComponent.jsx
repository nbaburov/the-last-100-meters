// @components
import {
	Card,
	Input,
	Button,
	CardBody,
	CardHeader,
	Typography,
} from "@material-tailwind/react";
import {useState} from "react";

function SignIn(props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault()
		// eslint-disable-next-line react/prop-types
		props.logIn(email, password);
	}

	return (
		<section className="p-8">
			<div className="container m-auto min-h-full grid place-items-center">
				<Card
					shadow={false}
					className="md:px-24 md:py-14 py-8 border border-gray-300"
				>
					<CardHeader
						shadow={false}
						floated={false}
						className="text-center"
					>
						<Typography
							variant="h1"
							color="blue-gray"
							className="mb-4 !text-3xl lg:text-4xl"
						>
							Log In
						</Typography>
						<Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
							See where your packages are at all times.
						</Typography>
					</CardHeader>
					<CardBody>
						<form
							action="#"
							className="flex flex-col gap-4 md:mt-12"
							onSubmit={handleSubmit}
						>
							<div>
								<label htmlFor="email">
									<Typography
										variant="small"
										color="blue-gray"
										className="block font-medium mb-2"
									>
										Your Email
									</Typography>
								</label>
								<Input
									id="email"
									color="gray"
									size="lg"
									type="email"
									name="email"
									placeholder="name@mail.com"
									className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
									labelProps={{
										className: "hidden",
									}}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="password">
									<Typography
										variant="small"
										color="blue-gray"
										className="block font-medium mb-2"
									>
										Your Password
									</Typography>
								</label>
								<Input
									id="password"
									color="gray"
									size="lg"
									type="password"
									name="password"
									placeholder="********"
									className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
									labelProps={{
										className: "hidden",
									}}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<Button size="lg" color="gray" type={"submit"} fullWidth>
								continue
							</Button>
							<Typography
								variant="small"
								className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
							>
								Upon signing in, you consent to abide by our{" "}
								<a href="#" className="text-gray-900">
									Terms of Service
								</a>{" "}
								&{" "}
								<a href="#" className="text-gray-900">
									Privacy Policy.
								</a>
							</Typography>
						</form>
					</CardBody>
				</Card>
			</div>
		</section>
	);
}

export default SignIn;
