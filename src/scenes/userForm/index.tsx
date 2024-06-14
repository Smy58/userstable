import { Box, Button, IconButton, TextField, Typography, useTheme } from "@mui/material"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

import { useAppDispatch } from "../../hook"
import { addUser } from "../../store/usersSlice"

import { DeleteOutlined } from "@mui/icons-material"

import useMediaQuery from "@mui/material/useMediaQuery"
import Header from "../../components/Header"
import { useState } from "react"
import { tokens } from "../../theme"

type skillType = {
	id: number,
	name: string
}

type FormValues = {
	firstName: string,
	lastName: string,
	email: string,
	skills: Array<skillType>
}

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const UserForm = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	
	const dispatch = useAppDispatch()

	const isNonMobile = useMediaQuery("(min-width: 600px)")

	const form = useForm<FormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			skills: []
		},
		mode: "all"
	})

	const { register, handleSubmit, formState, control } = form

	const { errors } = formState

	const [skills, setSkills] = useState<skillType[]>([])
	const [skillInput, setSkillInput] = useState('')

	const onAddSkill = () => {
		if (skillInput !== '') {
			setSkills([...skills, {
				id: new Date().valueOf(),
				name: skillInput
			}])

			setSkillInput('')

			
		}
	}

	const onRemoveSkill = (id: number ) => {
		var array = [...skills]; 
		var index = array.findIndex((item) => item.id === id)
		array.splice(index, 1)
		setSkills(array)

	}

	const onSubmit = (values: FormValues) => {

		values.skills = skills
		console.log(values);

		dispatch(addUser(values))
	}

	return (
		<Box m="20px">
			<Header title="CREATE USER" subtitle="Create a New User Profile" />
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Box
					display="grid"
					gap="30px"
					gridTemplateColumns="repeat(4, minmax(0, 1fr))"
					sx={{
						"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
					}}
				> 
					<TextField
						fullWidth
						variant="filled"
						type="text"
						{...register("firstName", {
							required: "required"
						})}
						label="First Name"
						sx={{ gridColumn: "span 2" }}
						error={!!errors.firstName}
						helperText={errors.firstName?.message}
					/>

					<TextField
						fullWidth
						variant="filled"
						type="text"
						{...register("lastName", {
							required: "required"
						})}
						label="Last Name"
						sx={{ gridColumn: "span 2" }}
						error={!!errors.lastName}
						helperText={errors.lastName?.message}
					/>

					<TextField
						fullWidth
						variant="filled"
						type="text"
						{...register("email", {
							required: "required",
							pattern: {
								value: emailRegExp,
								message: "Invalid email format",
							}
						})}
						label="Email"
						sx={{ gridColumn: "span 4" }}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>

					<TextField
						fullWidth
						variant="filled"
						type="text"
						value={skillInput}
						onChange={e => setSkillInput(e.target.value)}
						label="User Skill"
						sx={{ gridColumn: "span 2" }}
					/>

					<Button 
						variant="contained" 
						sx={{ 
							gridColumn: "span 1",
							backgroundColor: colors.blueAccent[700]
						}}
						onClick={onAddSkill}
					>
						Add Skill
					</Button>

					
				</Box>
				<Box 
					display="grid"
					gap="15px"
					gridTemplateColumns="repeat(3, minmax(0, 1fr))"
					sx={{
						"& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
					}} 
					mt="20px"
				>
					{ skills.map(item => 
						<Box 
							sx={{ 
								gridColumn: "span 1" ,
								backgroundColor: colors.blueAccent[700]
							}}
							key={item.id}
							display="flex"
							alignItems="center"
							justifyContent="center"
							borderRadius="10px"
							p="5px"
						>
							<Typography mr="5px">{item.name}</Typography>
							<IconButton onClick={() => onRemoveSkill(item.id)}>
								<DeleteOutlined />
							</IconButton>
						</Box>
					)}
				</Box>
				<Box display="flex" justifyContent="end" mt="20px">
					<Button type="submit" color="secondary" variant="contained">
						Create New User
					</Button>
				</Box>
			</form>
			<DevTool control={control}/>
		</Box>
	)
}

export default UserForm