import meQuery from '~/apollo/queries/user/me'

export default async function ({ app, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()

  if (!hasToken) {
    return redirect('/')
  }

  try {
    const {
      data: { me },
    } = await app.apolloProvider.defaultClient.query({
      query: meQuery,
    })

    if (!Object.keys(me).length) {
      return redirect('/')
    }
  } catch (error) {
    console.log(error)
    try {
      await app.$apolloHelpers.onLogout()

      return redirect('/')
    } catch (error) {
      console.log(error)
    }
  }
}
