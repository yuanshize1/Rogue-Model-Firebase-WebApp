import React, { Component } from "react";
import firstoreDB from "../../../../config/firestore";
import { Button, Grid, Form, Modal, Message } from "semantic-ui-react";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import genUID from "../../../../helpers/idGenerator";

class AddCalendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calanderID: "",
			calanderLink: "",
			calanderName: "",
			projectID: "",
			userID: "",
			customerEmail: "",
			status: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		const { history } = this.props;
		e.preventDefault();
		var tempCustomerID = this.props.match.params.customerid;
		var email;

		firstoreDB
			.collection("Calender")
			.add({
				calanderID: genUID(),
				calanderName: this.state.calanderName,
				calanderLink: this.state.calanderLink,
				projectID: this.props.match.params.projectid,
				userID: this.props.match.params.customerid,
				customerEmail: "error"
			})
			.then(function(docRef) {
				firstoreDB
					.collection("Calender")
					.doc(docRef.id)
					.update({ calanderID: docRef.id })
					.then(test => {
						// add customerEmail

						firstoreDB
							.collection("Customer")
							.where("customerID", "==", tempCustomerID)
							.get()
							.then(querySnapshot => {
								querySnapshot.forEach(doc => {
									// doc.data() is never undefined for query doc snapshots
									email = doc.data().customerEmail;
								});

								console.log(docRef.id);
								//Perform add
								firstoreDB
									.collection("Calender")
									.doc(docRef.id)
									.update({ customerEmail: email })
									.catch(error => {
										return this.setState({ status: error });
									});
							})
							.catch(function(error) {
								console.log("Error getting documents: ", error);
							});
					})
					.catch(error => {
						console.log(error);
						return this.setState({ status: error });
					});
			})
			.catch(function(error) {
				console.error("Error add Calendar:", error);
			});
		history.push(
			"/home/" +
				this.props.match.params.customerid +
				"/" +
				this.props.match.params.projectid +
				"/access"
		);
		return this.setState({ status: "Calendar created Successfully" });
	}

	render() {
		const { error } = this.state;
		return (
			<Modal open dimmer="blurring">
				<Modal.Header>Create Calendar</Modal.Header>
				<Modal.Description>
					{/* <navbar /> */}
					<Grid.Column width={6} />
					<Grid.Column width={4}>
						<Form error={error} onSubmit={this.onSubmit}>
							{/* <Header as="h1">Create Task </Header> */}
							{this.state.status && (
								<Message error={error} content={this.state.status.message} />
							)}
							{this.state.status && <Message content={this.state.status} />}
							<Form.Input
								inline
								label="Calendar Name"
								type="calanderName"
								id="calanderName"
								name="calanderName"
								placeholder="Calendar Name..."
								onChange={this.handleChange}
								className="inputfield"
							/>
							<Form.Input
								inline
								label="Calendar Link"
								type="calanderLink"
								id="calanderLink"
								name="calanderLink"
								placeholder="Calendar Link..."
								onChange={this.handleChange}
								className="inputfield"
							/>

							<Form.Button type="submit" className="confirmButton">
								Create!
							</Form.Button>
						</Form>
					</Grid.Column>
				</Modal.Description>
				<Modal.Actions>
					<Link
						to={
							"/home/" +
							this.props.match.params.customerid +
							"/" +
							this.props.match.params.projectid +
							"/access"
						}
					>
						<Button>Close</Button>
					</Link>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default withRouter(AddCalendar);
