import React from 'react';
import * as types from './constants/pagesTypes';
import * as pageController from './index';

export const pageTypeSelector = ({type, rest}) => {
    const mapPages = {
        [types.CHECK_BEST_MORTGAGE]: 'CheckBestMortgage',
        [types.CONTACT_US]: 'ContactUs',
        [types.HOMEPAGE]: 'HomePage',
        [types.FEW_LOANS]: 'FewLoans',
        [types.LOGIN]: 'Login',
        [types.NEW_MORTGAGE]: 'NewMortgage',
        [types.NORMAL_MORTGAGE]: 'NormalMortgage',
        [types.ONE_LOAN]: 'OneLoan',
        [types.OVER100K_LOAN]: 'Over100kLoan',
        [types.RECOVER]: 'Recover',
        [types.REGISTER]: 'Register',
        [types.UP_TO_100K_LOAN]: 'UpTo100kLoan'
    };
    const Component = pageController[mapPages[type]];
    return <Component { ...rest } />;
};