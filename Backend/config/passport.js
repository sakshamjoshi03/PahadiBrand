const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },

        async (accessToken, refreshToken, profile, done) => {

            try {

                const email = profile.emails[0].value;

                let user = await User.findOne({ email });

                if (!user) {

                    user = await User.create({

                        name: profile.displayName,

                        email,

                        googleId: profile.id,

                        avatar: profile.photos?.[0]?.value || "",

                    });

                }

                else {

                    if (!user.googleId) {

                        user.googleId = profile.id;
                        user.avatar = profile.photos?.[0]?.value || "";
                        await user.save();

                    }

                }

                return done(null, user);

            }

            catch (error) {

                return done(error, null);

            }

        }
    )
);

module.exports = passport;