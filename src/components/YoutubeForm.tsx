import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"

type FormValues = {
  username: string
  email: string
  channel: string
}

export const YoutubeForm = () => {
  const form = useForm<FormValues>()

  const { register, control, handleSubmit } = form

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data)
  }

  return <div>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="label" htmlFor="username">Username</label>
      <input className="input" type="text" id="username" {...register("username", {
        required: "Username is required"
      })}></input>

      <label className="label" htmlFor="email">Email</label>
      <input className="input" type="email" id="email" {...register("email")}></input>

      <label className="label" htmlFor="channel">Channel</label>
      <input className="input" type="text" id="channel" {...register("channel")}></input>

      <button id="submit-button">Submit</button>
    </form>
    <DevTool control={control} />
  </div>;
};
