const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 
                         (process.env.BACKEND_URL 
                            ? `${process.env.BACKEND_URL}/api/auth/google/callback` 
                            : "http://localhost:5000/api/auth/google/callback"),
            proxy: true,
        },

        async (accessToken, refreshToken, profile, done) => {

            try {

                if (!profile.emails || profile.emails.length === 0) {
                    return done(new Error("No email found in your Google profile"), null);
                }

                const email = profile.emails[0].value;

                let user = await User.findOne({ email });

                if (!user) {

                    user = await User.create({

                        name: profile.displayName || "Google User",

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