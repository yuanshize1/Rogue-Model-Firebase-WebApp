import React from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import CustomerForm from "./customerForm";
import AdminForm from "./adminForm";
import ContractForm from "./contractorForm";
import ManagerForm from "./managerForm";

class AdminProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userType: ""
		};
		this.handleChange = this.handleChange.bind(this);
		// this.onSubmit = this.onSubmit.bind(this);
	}

	// onSubmit(e) {
	// 	e.preventDefault();
	// }

	handleChange(e, { name, value }) {
		this.setState({ [name]: value });
	}

	render() {
		const { error } = this.state;

		return (
			<Grid>
				<Helmet>
					<title>Create Account</title>
				</Helmet>
				{/* <navbar /> */}
				<Grid.Column width={6} />
				<Grid.Column width={4}>
					<Form error={error} onSubmit={this.onSubmit}>
						<Header as="h1">Create account</Header>
						{error && <Message error={error} content="Try again" />}
						<Form.Group inline>
							<label>User Type</label>
							<Form.Radio
								label="Admin"
								name="userType"
								value="admin"
								checked={this.state.userType === "admin"}
								onChange={this.handleChange}
							/>
							<Form.Radio
								label="Customer"
								name="userType"
								value="customer"
								checked={this.state.userType === "customer"}
								onChange={this.handleChange}
							/>
							<Form.Radio
								label="Manager"
								name="userType"
								value="manager"
								checked={this.state.userType === "manager"}
								onChange={this.handleChange}
							/>
							<Form.Radio
								label="Contractor"
								name="userType"
								value="contractor"
								checked={this.state.userType === "contractor"}
								onChange={this.handleChange}
							/>
						</Form.Group>{" "}
						{/* <Form.Button type="submit">Create!</Form.Button> */}
					</Form>
					{this.state.userType.trim() == "customer" && <CustomerForm />}
					{this.state.userType.trim() == "admin" && <AdminForm />}
					{this.state.userType.trim() == "contractor" && <ContractForm />}
					{this.state.userType.trim() == "manager" && <ManagerForm />}
				</Grid.Column>
			</Grid>
		);
	}
}

export default AdminProfile;
