const emailTemplate = (mayoralty, firstName, lastName, email, postcode) => `
  
  Dear ${mayoralty} Mayoral Candidates,
  
  The creative and cultural sector has been seriously impacted by the national response to the pandemic. Workers in the creative industries â€“ often mixing short-term freelance contracts and employed work in the public, private and third sector - have seen their income dramatically reduce over the past year, particularly those working in live arts and venue-based workplaces. Many of the highly skilled and highly trained people in who keep our city region vibrant and dynamic have fallen through the gaps in the furlough and Self-Employed lncome Support schemes, receiving little or even no help.
  
  Yet all of us have depended on the work of the creative sector to get us through these difficult times. How would we have managed without books, music, TV and radio broadcasts, box sets, films, computer games, and digital streaming of thousands of live performances during the endless hours of lockdown? And how many of us long to see live performances again, in our local theatres, concert halls, stadiums and festivals?
  
  Now, more than ever, we need to value, respect and support our cultural industries workforce as we emerge from the pandemic together. In the months and years ahead, the incoming Metro Mayor for our area will need to lead a rebuilding of our regional economy. We must place the creative and cultural sector at the very heart of that recovery; by increasing employment and economic activity, but also spurring innovation, promoting diversity and making a positive social impact on health, well-being, education, inclusion and urban regeneration.
  
  As a candidate running to be the Metro Mayor, I make this pledge to the creative and cultural industries workforce in my city region:
  
  Yours sincerely,
  
  ${firstName} ${lastName}
  ${email}
  ${postcode}
  `

const form = document.querySelector("#rw-postcode-lookup-form")

if (form) {
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
        document.querySelectorAll(
          ".gf-name input:first-of-type"
        ).value = firstName
        document.querySelectorAll(
          ".gf-name input:last-of-type"
        ).value = lastName
        document.querySelector(".gf-email").value = email
        document.querySelector(".gf-postcode").value = postcode
        document.querySelector(
          ".gf-candidate-emails"
        ).value = mayoralty.cc.join(",")
        document.querySelector(".gf-message").value = emailTemplate(
          mayoralty.mayoralty,
          firstName,
          lastName,
          email,
          postcode
        )
        // 2. make form visible
        gravityForm.style.display = "block"
      } else {
        // handle no elections
        form.innerHTML +=
          "Sorry, you don't live in an area holding a Metro Mayoral election this May. You can still help by spreading the word - use the buttons below to ask your friends to email their candidates!"
      }
    } catch (e) {
      console.log(e)
      form.innerHTML +=
        "There was a problem. Please refresh the page or try again later."
    }
  })
}
