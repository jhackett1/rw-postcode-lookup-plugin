import mayoralties from "./mayoralties.json"
import emailTemplate from "./email-template"

const form = document.querySelector("#rw-postcode-lookup-form")
const gravityForm = document.querySelector(".gf-form")

if (form && gravityForm) {
  // hide the gravity form
  gravityForm.style.display = "none"

  form.addEventListener("submit", async e => {
    try {
      e.preventDefault()

      const formData = new FormData(form)

      const firstName = formData.get("first_name")
      const lastName = formData.get("last_name")
      const email = formData.get("email")
      const postcode = formData.get("postcode")

      const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
      const {
        result: { admin_district },
      } = await res.json()

      const mayoralty = mayoralties.find(m => {
        return m.districts.includes(admin_district)
      })

      if (mayoralty) {
        // 1. insert values
        document.querySelector(
          ".gf-name input[aria-label='First name']"
        ).value = firstName
        document.querySelector(
          ".gf-name input[aria-label='Last name']"
        ).value = lastName
        document.querySelector(
          ".gf-postcode input[type='text']"
        ).value = postcode
        document.querySelector(".gf-email input[type='text']").value = email
        document.querySelector(
          ".gf-candidate-emails input"
        ).value = mayoralty.cc.join(",")
        document.querySelector(".gf-message textarea").value = emailTemplate(
          mayoralty.mayoralty,
          firstName,
          lastName,
          email,
          postcode
        )
        // 2. make gravity form visible again
        gravityForm.style.display = "block"
      } else {
        // handle no elections
        gravityForm.style.display = "none"
        form.innerHTML += `<p class="rw-message">Sorry, you don't live in an area holding a Metro Mayoral election this May. You can still help by spreading the word - use the buttons below to ask your friends to email their candidates!</p>`
      }
    } catch (e) {
      // handle other errors
      console.log(e)
      form.innerHTML += `<p class="rw-message">There was a problem. Please refresh the page or try again later.</p>`
    }
  })
}
