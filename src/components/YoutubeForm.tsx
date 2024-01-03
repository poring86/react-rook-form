import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"

export const YoutubeForm = () => {
  const form = useForm()
  const { register, control } = form

  return <div>
    <form>
      <label className="label" htmlFor="username">Username</label>
      <input className="input" type="text" id="username" {...register("username")}></input>

      <label className="label" htmlFor="email">Email</label>
      <input className="input" type="email" id="email" {...register("email")}></input>

      <label className="label" htmlFor="channel">Channel</label>
      <input className="input" type="text" id="channel" {...register("channel")}></input>

      <button id="submit-button">Submit</button>
    </form>
    <DevTool control={control} />
  </div>;
};
