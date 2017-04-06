AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    placeholder: {
        signUp: "At least six characters"
    },
    required: true,
    minLength: 6,
    re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
});
AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: "Name",
    placeholder: {
        signUp: "Give yourself a beautiful nickname"
    },
    required: true,
    errStr: 'Nickname is required',
});

var preSignUpFunc = function(password, info){
  info.profile['avatar_url'] = USER.DEFAULT_AVATAR_URL;
};

AccountsTemplates.configure({
    preSignUpHook: preSignUpFunc
});

