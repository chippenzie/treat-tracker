import NextAuth from "next-auth"

import Apple from "next-auth/providers/apple"
import AzureB2C from "next-auth/providers/azure-ad-b2c"
import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
import Discord from "next-auth/providers/discord"
import Dropbox from "next-auth/providers/dropbox"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import Gitlab from "next-auth/providers/gitlab"
import Google from "next-auth/providers/google"
import Hubspot from "next-auth/providers/hubspot"
import LinkedIn from "next-auth/providers/linkedin"
import Netlify from "next-auth/providers/netlify"
import Pinterest from "next-auth/providers/pinterest"
import Reddit from "next-auth/providers/reddit"
import Slack from "next-auth/providers/slack"
import Spotify from "next-auth/providers/spotify"
import Twitch from "next-auth/providers/twitch"
import Twitter from "next-auth/providers/twitter"
import WorkOS from "next-auth/providers/workos"
import Zoom from "next-auth/providers/zoom"

import type { NextAuthConfig } from "next-auth"

export const config = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    GitHub,
    Gitlab,
    Google,
    Twitch,
    Twitter,
    WorkOS({
      connection: process.env.AUTH_WORKOS_CONNECTION!,
    }),
    Zoom,
  ],
  basePath: "/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
