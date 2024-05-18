"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@auth";
exports.ids = ["vendor-chunks/@auth"];
exports.modules = {

/***/ "(rsc)/./node_modules/@auth/mongodb-adapter/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@auth/mongodb-adapter/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MongoDBAdapter: () => (/* binding */ MongoDBAdapter),\n/* harmony export */   _id: () => (/* binding */ _id),\n/* harmony export */   defaultCollections: () => (/* binding */ defaultCollections),\n/* harmony export */   format: () => (/* binding */ format)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/**\n * <div style={{display: \"flex\", justifyContent: \"space-between\", alignItems: \"center\", padding: 16}}>\n *  <p>Official <a href=\"https://www.mongodb.com\">MongoDB</a> adapter for Auth.js / NextAuth.js.</p>\n *  <a href=\"https://www.mongodb.com\">\n *   <img style={{display: \"block\"}} src=\"https://authjs.dev/img/adapters/mongodb.svg\" width=\"30\" />\n *  </a>\n * </div>\n *\n * ## Installation\n *\n * ```bash npm2yarn\n * npm install @auth/mongodb-adapter mongodb\n * ```\n *\n * @module @auth/mongodb-adapter\n */\n\nconst defaultCollections = {\n    Users: \"users\",\n    Accounts: \"accounts\",\n    Sessions: \"sessions\",\n    VerificationTokens: \"verification_tokens\",\n};\nconst format = {\n    /** Takes a MongoDB object and returns a plain old JavaScript object */\n    from(object) {\n        const newObject = {};\n        for (const key in object) {\n            const value = object[key];\n            if (key === \"_id\") {\n                newObject.id = value.toHexString();\n            }\n            else if (key === \"userId\") {\n                newObject[key] = value.toHexString();\n            }\n            else {\n                newObject[key] = value;\n            }\n        }\n        return newObject;\n    },\n    /** Takes a plain old JavaScript object and turns it into a MongoDB object */\n    to(object) {\n        const newObject = {\n            _id: _id(object.id),\n        };\n        for (const key in object) {\n            const value = object[key];\n            if (key === \"userId\")\n                newObject[key] = _id(value);\n            else if (key === \"id\")\n                continue;\n            else\n                newObject[key] = value;\n        }\n        return newObject;\n    },\n};\n/** @internal */\nfunction _id(hex) {\n    if (hex?.length !== 24)\n        return new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId();\n    return new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(hex);\n}\nfunction MongoDBAdapter(client, options = {}) {\n    const { collections } = options;\n    const { from, to } = format;\n    const db = (async () => {\n        const _db = (await client).db(options.databaseName);\n        const c = { ...defaultCollections, ...collections };\n        return {\n            U: _db.collection(c.Users),\n            A: _db.collection(c.Accounts),\n            S: _db.collection(c.Sessions),\n            V: _db.collection(c?.VerificationTokens),\n        };\n    })();\n    return {\n        async createUser(data) {\n            const user = to(data);\n            await (await db).U.insertOne(user);\n            return from(user);\n        },\n        async getUser(id) {\n            const user = await (await db).U.findOne({ _id: _id(id) });\n            if (!user)\n                return null;\n            return from(user);\n        },\n        async getUserByEmail(email) {\n            const user = await (await db).U.findOne({ email });\n            if (!user)\n                return null;\n            return from(user);\n        },\n        async getUserByAccount(provider_providerAccountId) {\n            const account = await (await db).A.findOne(provider_providerAccountId);\n            if (!account)\n                return null;\n            const user = await (await db).U.findOne({ _id: new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(account.userId) });\n            if (!user)\n                return null;\n            return from(user);\n        },\n        async updateUser(data) {\n            const { _id, ...user } = to(data);\n            const result = await (await db).U.findOneAndUpdate({ _id }, { $set: user }, { returnDocument: \"after\" });\n            return from(result);\n        },\n        async deleteUser(id) {\n            const userId = _id(id);\n            const m = await db;\n            await Promise.all([\n                m.A.deleteMany({ userId: userId }),\n                m.S.deleteMany({ userId: userId }),\n                m.U.deleteOne({ _id: userId }),\n            ]);\n        },\n        linkAccount: async (data) => {\n            const account = to(data);\n            await (await db).A.insertOne(account);\n            return account;\n        },\n        async unlinkAccount(provider_providerAccountId) {\n            const account = await (await db).A.findOneAndDelete(provider_providerAccountId);\n            return from(account);\n        },\n        async getSessionAndUser(sessionToken) {\n            const session = await (await db).S.findOne({ sessionToken });\n            if (!session)\n                return null;\n            const user = await (await db).U.findOne({ _id: new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(session.userId) });\n            if (!user)\n                return null;\n            return {\n                user: from(user),\n                session: from(session),\n            };\n        },\n        async createSession(data) {\n            const session = to(data);\n            await (await db).S.insertOne(session);\n            return from(session);\n        },\n        async updateSession(data) {\n            const { _id, ...session } = to(data);\n            const updatedSession = await (await db).S.findOneAndUpdate({ sessionToken: session.sessionToken }, { $set: session }, { returnDocument: \"after\" });\n            return from(updatedSession);\n        },\n        async deleteSession(sessionToken) {\n            const session = await (await db).S.findOneAndDelete({\n                sessionToken,\n            });\n            return from(session);\n        },\n        async createVerificationToken(data) {\n            await (await db).V.insertOne(to(data));\n            return data;\n        },\n        async useVerificationToken(identifier_token) {\n            const verificationToken = await (await db).V.findOneAndDelete(identifier_token);\n            if (!verificationToken)\n                return null;\n            const { _id, ...rest } = verificationToken;\n            return rest;\n        },\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQGF1dGgvbW9uZ29kYi1hZGFwdGVyL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxnQkFBZ0IscUZBQXFGO0FBQ3JHO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUM7QUFDNUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNPO0FBQ1A7QUFDQSxtQkFBbUIsNkNBQVE7QUFDM0IsZUFBZSw2Q0FBUTtBQUN2QjtBQUNPLDRDQUE0QztBQUNuRCxZQUFZLGNBQWM7QUFDMUIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxzREFBc0QsY0FBYztBQUNwRTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxzREFBc0QsT0FBTztBQUM3RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsU0FBUyw2Q0FBUSxrQkFBa0I7QUFDekY7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkMsaUVBQWlFLEtBQUssSUFBSSxZQUFZLElBQUkseUJBQXlCO0FBQ25IO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGdCQUFnQjtBQUNqRCxpQ0FBaUMsZ0JBQWdCO0FBQ2pELGdDQUFnQyxhQUFhO0FBQzdDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHlEQUF5RCxjQUFjO0FBQ3ZFO0FBQ0E7QUFDQSxzREFBc0QsU0FBUyw2Q0FBUSxrQkFBa0I7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0Qyx5RUFBeUUsb0NBQW9DLElBQUksZUFBZSxJQUFJLHlCQUF5QjtBQUM3SjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQSxTQUFTO0FBQ1Q7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zvb2RfYXBwLy4vbm9kZV9tb2R1bGVzL0BhdXRoL21vbmdvZGItYWRhcHRlci9pbmRleC5qcz82MWVjIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogPGRpdiBzdHlsZT17e2Rpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIHBhZGRpbmc6IDE2fX0+XG4gKiAgPHA+T2ZmaWNpYWwgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1vbmdvZGIuY29tXCI+TW9uZ29EQjwvYT4gYWRhcHRlciBmb3IgQXV0aC5qcyAvIE5leHRBdXRoLmpzLjwvcD5cbiAqICA8YSBocmVmPVwiaHR0cHM6Ly93d3cubW9uZ29kYi5jb21cIj5cbiAqICAgPGltZyBzdHlsZT17e2Rpc3BsYXk6IFwiYmxvY2tcIn19IHNyYz1cImh0dHBzOi8vYXV0aGpzLmRldi9pbWcvYWRhcHRlcnMvbW9uZ29kYi5zdmdcIiB3aWR0aD1cIjMwXCIgLz5cbiAqICA8L2E+XG4gKiA8L2Rpdj5cbiAqXG4gKiAjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBgYGBiYXNoIG5wbTJ5YXJuXG4gKiBucG0gaW5zdGFsbCBAYXV0aC9tb25nb2RiLWFkYXB0ZXIgbW9uZ29kYlxuICogYGBgXG4gKlxuICogQG1vZHVsZSBAYXV0aC9tb25nb2RiLWFkYXB0ZXJcbiAqL1xuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xsZWN0aW9ucyA9IHtcbiAgICBVc2VyczogXCJ1c2Vyc1wiLFxuICAgIEFjY291bnRzOiBcImFjY291bnRzXCIsXG4gICAgU2Vzc2lvbnM6IFwic2Vzc2lvbnNcIixcbiAgICBWZXJpZmljYXRpb25Ub2tlbnM6IFwidmVyaWZpY2F0aW9uX3Rva2Vuc1wiLFxufTtcbmV4cG9ydCBjb25zdCBmb3JtYXQgPSB7XG4gICAgLyoqIFRha2VzIGEgTW9uZ29EQiBvYmplY3QgYW5kIHJldHVybnMgYSBwbGFpbiBvbGQgSmF2YVNjcmlwdCBvYmplY3QgKi9cbiAgICBmcm9tKG9iamVjdCkge1xuICAgICAgICBjb25zdCBuZXdPYmplY3QgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJfaWRcIikge1xuICAgICAgICAgICAgICAgIG5ld09iamVjdC5pZCA9IHZhbHVlLnRvSGV4U3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXkgPT09IFwidXNlcklkXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdPYmplY3Rba2V5XSA9IHZhbHVlLnRvSGV4U3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdPYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdPYmplY3Q7XG4gICAgfSxcbiAgICAvKiogVGFrZXMgYSBwbGFpbiBvbGQgSmF2YVNjcmlwdCBvYmplY3QgYW5kIHR1cm5zIGl0IGludG8gYSBNb25nb0RCIG9iamVjdCAqL1xuICAgIHRvKG9iamVjdCkge1xuICAgICAgICBjb25zdCBuZXdPYmplY3QgPSB7XG4gICAgICAgICAgICBfaWQ6IF9pZChvYmplY3QuaWQpLFxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcInVzZXJJZFwiKVxuICAgICAgICAgICAgICAgIG5ld09iamVjdFtrZXldID0gX2lkKHZhbHVlKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PT0gXCJpZFwiKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG5ld09iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld09iamVjdDtcbiAgICB9LFxufTtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBmdW5jdGlvbiBfaWQoaGV4KSB7XG4gICAgaWYgKGhleD8ubGVuZ3RoICE9PSAyNClcbiAgICAgICAgcmV0dXJuIG5ldyBPYmplY3RJZCgpO1xuICAgIHJldHVybiBuZXcgT2JqZWN0SWQoaGV4KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBNb25nb0RCQWRhcHRlcihjbGllbnQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbnMgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgeyBmcm9tLCB0byB9ID0gZm9ybWF0O1xuICAgIGNvbnN0IGRiID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgX2RiID0gKGF3YWl0IGNsaWVudCkuZGIob3B0aW9ucy5kYXRhYmFzZU5hbWUpO1xuICAgICAgICBjb25zdCBjID0geyAuLi5kZWZhdWx0Q29sbGVjdGlvbnMsIC4uLmNvbGxlY3Rpb25zIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBVOiBfZGIuY29sbGVjdGlvbihjLlVzZXJzKSxcbiAgICAgICAgICAgIEE6IF9kYi5jb2xsZWN0aW9uKGMuQWNjb3VudHMpLFxuICAgICAgICAgICAgUzogX2RiLmNvbGxlY3Rpb24oYy5TZXNzaW9ucyksXG4gICAgICAgICAgICBWOiBfZGIuY29sbGVjdGlvbihjPy5WZXJpZmljYXRpb25Ub2tlbnMpLFxuICAgICAgICB9O1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXN5bmMgY3JlYXRlVXNlcihkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gdG8oZGF0YSk7XG4gICAgICAgICAgICBhd2FpdCAoYXdhaXQgZGIpLlUuaW5zZXJ0T25lKHVzZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGZyb20odXNlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGdldFVzZXIoaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCAoYXdhaXQgZGIpLlUuZmluZE9uZSh7IF9pZDogX2lkKGlkKSB9KTtcbiAgICAgICAgICAgIGlmICghdXNlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmcm9tKHVzZXIpO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBnZXRVc2VyQnlFbWFpbChlbWFpbCkge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IChhd2FpdCBkYikuVS5maW5kT25lKHsgZW1haWwgfSk7XG4gICAgICAgICAgICBpZiAoIXVzZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gZnJvbSh1c2VyKTtcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgZ2V0VXNlckJ5QWNjb3VudChwcm92aWRlcl9wcm92aWRlckFjY291bnRJZCkge1xuICAgICAgICAgICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IChhd2FpdCBkYikuQS5maW5kT25lKHByb3ZpZGVyX3Byb3ZpZGVyQWNjb3VudElkKTtcbiAgICAgICAgICAgIGlmICghYWNjb3VudClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCAoYXdhaXQgZGIpLlUuZmluZE9uZSh7IF9pZDogbmV3IE9iamVjdElkKGFjY291bnQudXNlcklkKSB9KTtcbiAgICAgICAgICAgIGlmICghdXNlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmcm9tKHVzZXIpO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyB1cGRhdGVVc2VyKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgX2lkLCAuLi51c2VyIH0gPSB0byhkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IChhd2FpdCBkYikuVS5maW5kT25lQW5kVXBkYXRlKHsgX2lkIH0sIHsgJHNldDogdXNlciB9LCB7IHJldHVybkRvY3VtZW50OiBcImFmdGVyXCIgfSk7XG4gICAgICAgICAgICByZXR1cm4gZnJvbShyZXN1bHQpO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBkZWxldGVVc2VyKGlkKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSBfaWQoaWQpO1xuICAgICAgICAgICAgY29uc3QgbSA9IGF3YWl0IGRiO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIG0uQS5kZWxldGVNYW55KHsgdXNlcklkOiB1c2VySWQgfSksXG4gICAgICAgICAgICAgICAgbS5TLmRlbGV0ZU1hbnkoeyB1c2VySWQ6IHVzZXJJZCB9KSxcbiAgICAgICAgICAgICAgICBtLlUuZGVsZXRlT25lKHsgX2lkOiB1c2VySWQgfSksXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGlua0FjY291bnQ6IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY2NvdW50ID0gdG8oZGF0YSk7XG4gICAgICAgICAgICBhd2FpdCAoYXdhaXQgZGIpLkEuaW5zZXJ0T25lKGFjY291bnQpO1xuICAgICAgICAgICAgcmV0dXJuIGFjY291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHVubGlua0FjY291bnQocHJvdmlkZXJfcHJvdmlkZXJBY2NvdW50SWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCAoYXdhaXQgZGIpLkEuZmluZE9uZUFuZERlbGV0ZShwcm92aWRlcl9wcm92aWRlckFjY291bnRJZCk7XG4gICAgICAgICAgICByZXR1cm4gZnJvbShhY2NvdW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgZ2V0U2Vzc2lvbkFuZFVzZXIoc2Vzc2lvblRva2VuKSB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgKGF3YWl0IGRiKS5TLmZpbmRPbmUoeyBzZXNzaW9uVG9rZW4gfSk7XG4gICAgICAgICAgICBpZiAoIXNlc3Npb24pXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgKGF3YWl0IGRiKS5VLmZpbmRPbmUoeyBfaWQ6IG5ldyBPYmplY3RJZChzZXNzaW9uLnVzZXJJZCkgfSk7XG4gICAgICAgICAgICBpZiAoIXVzZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHVzZXI6IGZyb20odXNlciksXG4gICAgICAgICAgICAgICAgc2Vzc2lvbjogZnJvbShzZXNzaW9uKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGNyZWF0ZVNlc3Npb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHRvKGRhdGEpO1xuICAgICAgICAgICAgYXdhaXQgKGF3YWl0IGRiKS5TLmluc2VydE9uZShzZXNzaW9uKTtcbiAgICAgICAgICAgIHJldHVybiBmcm9tKHNlc3Npb24pO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyB1cGRhdGVTZXNzaW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgX2lkLCAuLi5zZXNzaW9uIH0gPSB0byhkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRTZXNzaW9uID0gYXdhaXQgKGF3YWl0IGRiKS5TLmZpbmRPbmVBbmRVcGRhdGUoeyBzZXNzaW9uVG9rZW46IHNlc3Npb24uc2Vzc2lvblRva2VuIH0sIHsgJHNldDogc2Vzc2lvbiB9LCB7IHJldHVybkRvY3VtZW50OiBcImFmdGVyXCIgfSk7XG4gICAgICAgICAgICByZXR1cm4gZnJvbSh1cGRhdGVkU2Vzc2lvbik7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGRlbGV0ZVNlc3Npb24oc2Vzc2lvblRva2VuKSB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgKGF3YWl0IGRiKS5TLmZpbmRPbmVBbmREZWxldGUoe1xuICAgICAgICAgICAgICAgIHNlc3Npb25Ub2tlbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZyb20oc2Vzc2lvbik7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGNyZWF0ZVZlcmlmaWNhdGlvblRva2VuKGRhdGEpIHtcbiAgICAgICAgICAgIGF3YWl0IChhd2FpdCBkYikuVi5pbnNlcnRPbmUodG8oZGF0YSkpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHVzZVZlcmlmaWNhdGlvblRva2VuKGlkZW50aWZpZXJfdG9rZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IHZlcmlmaWNhdGlvblRva2VuID0gYXdhaXQgKGF3YWl0IGRiKS5WLmZpbmRPbmVBbmREZWxldGUoaWRlbnRpZmllcl90b2tlbik7XG4gICAgICAgICAgICBpZiAoIXZlcmlmaWNhdGlvblRva2VuKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgY29uc3QgeyBfaWQsIC4uLnJlc3QgfSA9IHZlcmlmaWNhdGlvblRva2VuO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@auth/mongodb-adapter/index.js\n");

/***/ })

};
;