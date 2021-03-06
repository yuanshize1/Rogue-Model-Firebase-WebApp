/* eslint-disable arrow-body-style */
import React from "react";
import { Header, Icon, Menu, Sidebar, Dropdown } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import styles from "./styles.css";
import { Route, Link, Redirect, Switch, BrowserRouter } from "react-router-dom";
import firebase from "../../config/Fire";
import adminProfile from "../Admin-profile/index";
import FourOhFour from "../FourOhFour/index";
import signUp from "../signUp/signup";
import home from "../home/customer";
import project from "../home/home-project";
import addCustomer from "../home/CustomerAction/addCustomerModal";
import editCustomer from "../Firestore-components/Customer/customerDataEdit";
import addProjects from "../home/ProjectAction/addProjectModal";
import editProject from "../Firestore-components/Project/projectDataEdit";
import accessNav from "../home/Access/nav";
import accessDocument from "../home/Access/documentFile/fileAll";
import accessTask from "../home/Access/Task/taskAll";
import accessInvoice from "../home/Access/Invoice/invoiceAll";
import accessCalendar from "../home/Access/Calendar/calendarAll";

const handleLogout = history => () => {
	firebase.auth().signOut();
	history.push("/");
	console.log("you have been logged out. boo!");
};

const Cms = ({ history }) => {
	// Check user is logged in
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			console.log("is Signed in");
		} else {
			// No user is signed in.
			firebase.auth().signOut();
			history.push("/");
		}
	});

	return (
		<div>
			<Helmet>
				<title>CMS</title>
			</Helmet>
			<Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
				<Link to="/home">
					<Menu.Item name="Home">
						<Icon name="home" />
						Home
					</Menu.Item>
				</Link>

				<Link to="/home">
					<Menu.Item name="search">
						<Icon name="search" />
						Search
					</Menu.Item>
				</Link>

				<Link to="/home/admin-profile">
					<Menu.Item name="users">
						<Icon name="user" />
						Profile
					</Menu.Item>
				</Link>

				<Link to="/home/signUp">
					<Menu.Item name="createAccount">
						<Icon name="user plus" />
						Create account
					</Menu.Item>
				</Link>

				<a
					target="_blank"
					href="https://calendar.google.com/calendar/r"
					rel="noopener noreferrer"
				>
					<Menu.Item name="Your-Calender">
						<Icon name="calendar outline" />
						Your Calender
					</Menu.Item>
				</a>

				<Menu.Item name="logout" onClick={handleLogout(history)}>
					<Icon name="power" />
					Logout
				</Menu.Item>
			</Sidebar>

			<div className={styles.mainBody}>
				<Switch>
					<Route exact path="/home" component={home} />
					<Route exact path="/home/addCustomer" component={addCustomer} />
					<Route
						exact
						path="/home/:customerid/editCustomer"
						component={editCustomer}
					/>
					<Route
						exact
						path="/home/:customerid/:projectid/editProject"
						component={editProject}
					/>
					<Route path="/home/:customerid/addprojects" component={addProjects} />
					<Route path="/home/signUp" component={signUp} />
					<Route path="/home/admin-profile" component={adminProfile} />
					<Route path="/home/:customerid/project" component={project} />
					<Route
						exact
						path="/home/:customerid/:projectid/access"
						component={accessNav}
					/>

					<Route
						path="/home/:customerid/:projectid/access/document"
						component={accessDocument}
					/>
					<Route
						path="/home/:customerid/:projectid/access/task"
						component={accessTask}
					/>
					<Route
						path="/home/:customerid/:projectid/access/invoice"
						component={accessInvoice}
					/>
					<Route
						path="/home/:customerid/:projectid/access/calendar"
						component={accessCalendar}
					/>
					<Route component={FourOhFour} />
				</Switch>
			</div>
		</div>
	);
};

export default Cms;
