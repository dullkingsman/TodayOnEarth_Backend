(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{262:function(a,t,s){"use strict";s.r(t);var n=s(28),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"user-mutations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#user-mutations"}},[a._v("#")]),a._v(" User Mutations")]),a._v(" "),s("p",[a._v("These are the mutations defined under the user model, there are used to fetch data from the api regarding users")]),a._v(" "),s("h2",{attrs:{id:"signin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#signin"}},[a._v("#")]),a._v(" signIn")]),a._v(" "),s("div",{staticClass:"language-graphql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-graphql"}},[s("code",[a._v("    signIn"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("email")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("password")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Token\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("mutation for signing a user in and getting a token. "),s("code",[a._v("email")]),a._v(" - can also be a username")]),a._v(" "),s("h2",{attrs:{id:"signup"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#signup"}},[a._v("#")]),a._v(" signUp")]),a._v(" "),s("div",{staticClass:"language-graphql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-graphql"}},[s("code",[a._v("    signUp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("new_user")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" IUser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Token\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("mutation for signing a user up")]),a._v(" "),s("h2",{attrs:{id:"sendverification"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sendverification"}},[a._v("#")]),a._v(" sendVerification")]),a._v(" "),s("div",{staticClass:"language-graphql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-graphql"}},[s("code",[a._v("    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("sendVerification")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("mutation for sending an email-verification email to the user's email address")]),a._v(" "),s("h2",{attrs:{id:"resetpassword"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#resetpassword"}},[a._v("#")]),a._v(" resetPassword")]),a._v(" "),s("div",{staticClass:"language-graphql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-graphql"}},[s("code",[a._v("    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("resetPassword")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("email")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("mutation for sending a password reset token to the user's email address")]),a._v(" "),s("h2",{attrs:{id:"resetpasswordwithtoken"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#resetpasswordwithtoken"}},[a._v("#")]),a._v(" resetPasswordWithToken")]),a._v(" "),s("div",{staticClass:"language-graphql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-graphql"}},[s("code",[a._v("    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("resetPasswordWithToken")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("token")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("newPassword")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("mutation for modifying a password for a user given that the given reset token is correct")]),a._v(" "),s("h2",{attrs:{id:"makeuseradmin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#makeuseradmin"}},[a._v("#")]),a._v(" makeUserAdmin")]),a._v(" "),s("div",{staticClass:"language-graphql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-graphql"}},[s("code",[a._v("    makeUserAdmin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("uid")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Int"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("mutation for increasing the role field of a user to level 4. Which is an admin.")]),a._v(" "),s("h2",{attrs:{id:"signout"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#signout"}},[a._v("#")]),a._v(" signOut")]),a._v(" "),s("div",{staticClass:"language-graphql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-graphql"}},[s("code",[a._v("    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("signOut")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("mutation for signing the user out. It's not required for normal api use but for a frontend this helps by clearing the cookies associated with user identification.")]),a._v(" "),s("h2",{attrs:{id:"graphql-schema"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#graphql-schema"}},[a._v("#")]),a._v(" Graphql Schema")]),a._v(" "),s("p",[a._v("gql schema for this model goes")]),a._v(" "),s("div",{staticClass:"language-graphql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-graphql"}},[s("code",[a._v("extend "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("type")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Mutation")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    signIn"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("email")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("password")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Token\n    signUp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("new_user")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" IUser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Token\n    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("sendVerification")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("resetPassword")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("email")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("resetPasswordWithToken")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("token")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("newPassword")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" String"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n    makeUserAdmin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("uid")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Int"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n    "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("signOut")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" Boolean\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);