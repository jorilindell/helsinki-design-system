import React, { Children, cloneElement, isValidElement } from 'react';

import { HeaderNavigationMenuContextProvider } from '../headerNavigationMenu/HeaderNavigationMenuContext';
import { useHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import styles from './HeaderActionBarNavigationMenu.module.scss';
import { HeaderNavigationMenuContent } from '../headerNavigationMenu';
import { LinkProps } from '../../../../internal/LinkItem';
import HeaderActionBarLogo from './HeaderActionBarLogo';

type HeaderActionBarNavigationMenuProps = {
  /**
   * Logo to use
   */
  logo: JSX.Element;
  /**
   * Logo properties
   */
  logoProps: LinkProps;
};

export const HeaderActionBarNavigationMenu = ({ logo, logoProps }: HeaderActionBarNavigationMenuProps) => {
  const {
    hasNavigationContent,
    isNotLargeScreen,
    mobileMenuOpen,
    hasUniversalContent,
    universalContent,
  } = useHeaderContext();
  const className = classNames(styles.headerNavigationMenu, mobileMenuOpen && styles.mobileMenuOpen);

  if (!hasNavigationContent || !isNotLargeScreen) return null;

  return (
    <div className={className}>
      <nav className={styles.navigation}>
        <ul className={styles.headerNavigationMenuList}>
          <HeaderNavigationMenuContextProvider>
            <HeaderNavigationMenuContent />
          </HeaderNavigationMenuContextProvider>
        </ul>
      </nav>
      {hasUniversalContent && (
        <ul className={styles.universalList}>
          {Children.map(universalContent, (child, index) => {
            if (!isValidElement(child)) return null;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                {cloneElement(child, {
                  className: styles.universalLink,
                })}
              </li>
            );
          })}
        </ul>
      )}
      <HeaderActionBarLogo
        logoProps={{
          ...logoProps,
          className: classNames(logoProps.className, styles.logoLink),
        }}
        logo={logo}
      />
    </div>
  );
};
