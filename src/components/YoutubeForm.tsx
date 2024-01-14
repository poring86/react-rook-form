import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"

type FormValues = {
  username: string
  email: string
  channel: string
  social: {
    twitter: string
    facebook: string
  }
  phoneNumbers: string[]
  phNumbers: {
    number: string;
  }[]
}

export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Matheus",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: '' }]
    },
  })

  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

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
        <input className="input"
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => fieldValue !== "admin@example.com" ||
                "Enter a different email address",
              notBlackListed: (fieldValue) =>
                !fieldValue.endsWith("baddomain.com") ||
                "This domain is not supported"
              ,
              emailAvailable: async (fieldValue) => {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                );
                const data = await response.json();
                return data.length === 0 || "Email already exists";
              },
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

      <div className="form-control">
        <label className="label" htmlFor="twitter">Twitter</label>
        <input className="input" type="text" id="twitter" {...register("social.twitter", {
          required: "Channel is required"
        })}></input>
      </div>

      <div className="form-control">
        <label className="label" htmlFor="facebook">Facebook</label>
        <input className="input" type="text" id="facebook" {...register("social.facebook", {
          required: "Channel is required"
        })}></input>
      </div>

      <div className="form-control">
        <label className="label" htmlFor="primary-phone">Primary phone number</label>
        <input className="input" type="text" id="primary-phone" {...register("phoneNumbers.0", {
          required: "Channel is required"
        })}></input>
      </div>

      <div className="form-control">
        <label className="label" htmlFor="secondary-phone">Secondary phone number</label>
        <input className="input" type="text" id="secondary-phone" {...register("phoneNumbers.1", {
          required: "Channel is required"
        })}></input>
      </div>

      <div>
        <label>List of phone numbers</label>
        <div>
          {fields.map((field, index) => (
            <div className="form-control" key={field.id}>
              <input
                type="text"
                {...register(`phNumbers.${index}.number` as const)}
              />

              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({
                number: "",
              })
            }
          >
            Add phone number
          </button>
        </div>
      </div>

      <button id="submit-button" onClick={() => append({ number: "" })}>Submit</button>
    </form>
    <DevTool control={control} />
  </div>;
};
