import meQuery from '~/apollo/queries/user/me'

export default async function ({ app, redirect, store }) {
  const hasToken = !!app.$apolloHelpers.getToken()

  if (!hasToken) {
    store.dispatch('setForbiddenRoute', true)
    return redirect('/')
  }

  try {
    const {
      data: { me },
    } = await app.apolloProvider.defaultClient.query({
      query: meQuery,
    })

    if (!Object.keys(me).length) {
      store.dispatch('setForbiddenRoute', true)
      return redirect('/')
    }
    store.dispatch('authorizedUser', true)
  } catch (error) {
    console.log(error)
    try {
      await app.$apolloHelpers.onLogout()
      store.dispatch('setForbiddenRoute', true)
      return redirect('/')
    } catch (error) {
      console.log(error)
    }
  }
}
