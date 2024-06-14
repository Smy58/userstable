import { useState } from "react"
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { HomeOutlined, MenuOutlined, PeopleOutlined, PersonOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ReactElement } from "react";

const Item = (item: { title: string, to: string, icon: ReactElement<any>, seleceted: string, setSelected: Function}) => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	return (
		<MenuItem 
			active={item.seleceted === item.title} 
			style={{ color: colors.grey[100] }}
			onClick={() => item.setSelected(item.title)}
			icon={item.icon}
		>
			<Typography >{ item.title }</Typography>
			<Link to={item.to}/>
		</MenuItem>
	)
}

const Sidebar = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	const [isCollapsed, setIsCollapsed] = useState(false)
	const [seleceted, setSelected] = useState("Dashboard")

	return (
		<Box 
			sx={{
				"& .pro-sidebar-inner": {
					background: `${colors.primary[400]} !important`
				},
				"& .pro-icon-wrapper": {
					background: "transparent !important"
				},
				"& pro-inner-item": {
					padding: "5px 35px 5px 20px !important"
				},
				"& .pro-inner-item:hover": {
					color: "#868dfb !important"
				},
				"& .pro-menu-item.active": {
					color: "#6870fa !important"
				}
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					<MenuItem 
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlined/> : undefined}
						style={{
							margin: "10px 0 20px 0",
							color: colors.grey[100]
						}}
					>
						{!isCollapsed && (
							<Box 
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								ml="15px"
							>
								<Typography 
									variant="h3"
									color={colors.grey[100]}
								>
									ADMINS
								</Typography>

								<IconButton 
									onClick={() => setIsCollapsed(!isCollapsed)}
								>
									<MenuOutlined />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					<Box 
						paddingLeft={isCollapsed ? undefined : "10%"}
					>
						<Item 
							title="Users"
							to="/"
							icon={<PeopleOutlined />}
							seleceted={seleceted}
							setSelected={setSelected}
						/>
						<Item 
							title="Add user"
							to="/user-form"
							icon={<PersonOutlined />}
							seleceted={seleceted}
							setSelected={setSelected}
						/>
					</Box>
				</Menu>
			</ProSidebar>

		</Box>
	)
}

export default Sidebar