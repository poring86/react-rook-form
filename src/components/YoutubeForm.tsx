import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"

type FormValues = {
  username: string
  email: string
  channel: string
}

export const YoutubeForm = () => {
  const form = useForm<FormValues>()

  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data)
  }

  return <div>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-control">
        <label className="label" htmlFor="username">Username</label>
        <input className="input" type="text" id="username" {...register("username", {
          required: "Username is required"
        })}></input>
        <p className="error">{errors.username?.message}</p>
      </div>

      <div className="form-control">
        <label className="label" htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>
      </div>

      <div className="form-control">
        <label className="label" htmlFor="channel">Channel</label>
        <input className="input" type="text" id="channel" {...register("channel", {
          required: "Channel is required"
        })}></input>

        <p className="error">{errors.channel?.message}</p>
      </div>

      <button id="submit-button">Submit</button>
    </form>
    <DevTool control={control} />
  </div>;
};
