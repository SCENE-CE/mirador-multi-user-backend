import { Button, Grid, Typography } from "@mui/material";
import FormField from "components/elements/FormField.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, LoginSchema } from "../types/types.ts";
import { useLogin } from "../../../utils/auth.tsx";
import { LoginCredentialsDTO } from "../api/login.ts";

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = (
  {onSuccess}: LoginFormProps)=>{

  const { mutateAsync: loginUser } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: LoginCredentialsDTO) => {
    try {
      console.log(data)
      // Using mutateAsync to await the mutation's promise
      const user = await loginUser(data);
      console.log('Login successful', user);
      onSuccess();
      // Perform any actions after successful login
    } catch (error) {
      console.error('Login error:', error);
      // Handle login errors here, possibly update UI to show the error
    }
  };
  return(
    <form>
      <Grid
        container
        direction="column"
        spacing={2}
      >
        <Grid>
          <Typography
            variant="h2"
            component="h1"
          >
            Register Form
          </Typography>
        </Grid>
        <Grid item>
          <FormField
            type="mail"
            placeholder="mail"
            name="mail"
            required={true}
            register={register}
            error={errors.mail}
          />
        </Grid>
        <Grid item>
          <FormField
            type={"password"}
            placeholder={"password"}
            name={"password"}
            register={register}
            required={true}
            error={errors.password}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
)
}
