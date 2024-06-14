import { Typography, Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../hook";

import {
	EditOutlined
} from "@mui/icons-material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUsers } from "../../store/usersSlice";

type skillType = {
	id: number,
	name: string
}

type userDockType = {
	id: string
	firstName: string,
	lastName: string,
	email: string,
	skills: Array<skillType>
};

const Users = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const users = useAppSelector(state => state.users.list)
	
	const { loading, error} = useAppSelector(state => state.users)

	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	const onEdit = (id: string) => {
		
		navigate('/user-form-edit',{
			state: {id}
		})
	}

	const columns: GridColDef<userDockType>[] = [
		{ field: "id", headerName: "ID" },
		{ field: "firstName", headerName: "First Name", flex: 1, cellClassName: "name-column--cell" },
		{ field: "lastName", headerName: "Last Name", flex: 1, cellClassName: "name-column--cell" },
		{ field: "email", headerName: "Email", flex: 1 },
		{ field: "skills", headerName: "Skills", flex: 1, 
			renderCell: ({ row: { skills }}) => {
				return (
					<Typography 
						color={colors.grey[100]}
						sx={{ ml: "5px" }}
					>
						{skills[0]?.name}
						{
							skills.slice(1).map((item) => (
								', ' + item.name
							))
						}
					</Typography>
				)
			}
		},
		{ field: "edit", headerName: "Edit", flex: 1, 
			renderCell: ({ row: {id}}) => {
				
				return (
					<IconButton onClick={() => onEdit(id)}>
						<EditOutlined />
					</IconButton>
				)
			}
		},
		
	]

	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	return (
		<Box m="20px">
			<Header title="USERS" subtitle="Managing users"/>
			<Box 
				m="40px 0 0 0"
				height="65vh"

				sx={{
					"& .MuiDataGrid-root": {
						border: "none"
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
						display: "flex",
						alignItems: "center"
					},
					"& .name-column--cell": {
						color: colors.greenAccent[300],
					},
					"& .MuiDataGrid-columnHeader": {
						backgroundColor: colors.blueAccent[700],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: colors.primary[400],
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor: colors.blueAccent[700],
					},
					"& .MuiCheckbox-root": {
						color: `${colors.greenAccent[200]} !important`,
					},
					"& .MuiDataGrid-scrollbarFiller": {
						backgroundColor: colors.blueAccent[700]
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.grey[100]} !important`,
					},
				}}
			>
				<Box >
					{ 
						loading 
							? <Typography color={colors.greenAccent[400]} >Loading...</Typography>
							: error
								? <Typography color={colors.redAccent[400]} >Error: {error}</Typography>
								: ''
					}
				</Box>
				<DataGrid 
					rows={users}
					columns={columns}
					slots={{ toolbar: GridToolbar }}
				/>
			</Box>
		</Box>
	)
}

export default Users