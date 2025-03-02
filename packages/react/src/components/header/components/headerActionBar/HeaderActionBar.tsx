import React, { PropsWithChildren, MouseEventHandler, useEffect, useMemo, useRef } from 'react';

import { styleBoundClassNames } from '../../../../utils/classNames';
import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { HeaderLanguageSelectorConsumer, getLanguageSelectorComponentProps } from '../headerLanguageSelector';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { elementIsFocusable } from '../../../../utils/elementIsFocusable';
import { HeaderActionBarMenuItem } from '../headerActionBarItem';
import styles from './HeaderActionBar.module.scss';
import HeaderActionBarLogo from './HeaderActionBarLogo';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { useHeaderContext } from '../../HeaderContext';
import { HeaderActionBarItemProps } from '../headerActionBarItem/HeaderActionBarItem';

const classNames = styleBoundClassNames(styles);

enum TabBarrierPosition {
  top = 'top',
  bottom = 'bottom',
}

type TabBarrierProps = {
  id: string;
  tabIndex: number;
  'aria-hidden': boolean;
};

const defaultBarrierProps: Partial<TabBarrierProps> = {
  tabIndex: 0,
  'aria-hidden': true,
};

const ACTIONBAR_TAB_BARRIER_CLASS_NAME = 'hds-actionbar-tab-barrier';

const findFocusableElementsWithin = (element: HTMLElement) => {
  const elements = element.querySelectorAll('a, button, textarea, input[type="text"], select');

  return Array.from(elements).filter((item) => elementIsFocusable(item as HTMLElement));
};

const focusToActionBar = (position: TabBarrierPosition, element?: HTMLElement) => {
  if (element) {
    const focusableElements = findFocusableElementsWithin(element);

    if (focusableElements.length) {
      (focusableElements[
        position === TabBarrierPosition.top ? 0 : focusableElements.length - 1
      ] as HTMLElement).focus();
    }
  }
};

const ContentTabBarrier = ({ onFocus }: { onFocus: () => void }): JSX.Element => {
  /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
  return <div {...defaultBarrierProps} onFocus={onFocus} />;
};

const addDocumentTabBarrier = (position: TabBarrierPosition, actionBar?: HTMLElement): (() => void) => {
  if (document) {
    const element = document.createElement('div');
    element.className = ACTIONBAR_TAB_BARRIER_CLASS_NAME;
    element.tabIndex = defaultBarrierProps.tabIndex;
    element['aria-hidden'] = defaultBarrierProps['aria-hidden'];
    element.addEventListener('focus', () => focusToActionBar(position, actionBar));
    if (position === TabBarrierPosition.top) {
      document.body.insertBefore(element, document.body.firstChild);
    } else {
      document.body.appendChild(element);
    }

    return () => element.remove();
  }
  return null;
};

const addDocumentScrollPrevention = (actionBar?: HTMLElement) => {
  if (document && actionBar) {
    // Getting the closest ancestor HTML. Get the closest in case of iframes or such
    const closestHtmlElement = actionBar.closest('html');
    closestHtmlElement.style.overflow = 'hidden';

    return () => {
      closestHtmlElement.style.removeProperty('overflow');
    };
  }
  return null;
};

export enum TitleStyleType {
  Normal = 'normal',
  Bold = 'bold',
}

export type HeaderActionBarProps = PropsWithChildren<{
  /**
   * Aria-label for describing ActionBar.
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply.
   */
  className?: string;
  /**
   * Label for front page link in mobile navigation menu.
   */
  frontPageLabel: string;
  /**
   * Logo to use
   */
  logo: React.ReactElement<typeof Logo>;
  /**
   * The aria-label for the logo to screen reader users.
   */
  logoAriaLabel?: string;
  /**
   * Link for the logo.
   */
  logoHref?: string;
  /**
   * The aria-label for the menu button to screen reader users.
   */
  menuButtonAriaLabel?: string;
  /**
   * Callback fired when the logo is clicked.
   */
  onLogoClick?: MouseEventHandler;
  /**
   * Callback fired when the mobile menu is clicked.
   */
  onMenuClick?: MouseEventHandler;
  /**
   * Callback fired when the title is clicked.
   */
  onTitleClick?: MouseEventHandler;
  /**
   * Aria-label for describing opening main navigation links into view in mobile navigation menu.
   */
  openFrontPageLinksAriaLabel?: string;
  /**
   * ARIA role to describe the contents.
   */
  role?: string;
  /**
   * Service name that is displayed next to the Helsinki logo.
   */
  title: string;
  /**
   * The aria-label for the title describing the service to screen reader users.
   */
  titleAriaLabel?: string;
  /**
   * Link for the title.
   */
  titleHref: string;
  /**
   * Style for title.
   */
  titleStyle?: TitleStyleType;
}>;

export const HeaderActionBar = ({
  title,
  titleStyle,
  titleAriaLabel,
  logoAriaLabel,
  menuButtonAriaLabel,
  titleHref,
  logoHref,
  logo,
  onTitleClick,
  onLogoClick,
  onMenuClick,
  children,
  className,
  ariaLabel,
  role,
  frontPageLabel,
  openFrontPageLinksAriaLabel,
}: HeaderActionBarProps) => {
  const handleClick = useCallbackIfDefined(onTitleClick);
  const handleLogoClick = useCallbackIfDefined(onLogoClick);
  const handleKeyPress = useEnterOrSpacePressCallback(handleClick);
  const handleLogoKeyPress = useEnterOrSpacePressCallback(handleLogoClick);
  const { isNotLargeScreen, mobileMenuOpen } = useHeaderContext();
  const actionBarRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (mobileMenuOpen && actionBarRef !== undefined) {
      // When mobile menu is open, set up tab barriers to prevent keyboard navigation to content outside action bar and menu.
      const removeTopTabBarrier = addDocumentTabBarrier(TabBarrierPosition.top, actionBarRef.current);
      const removeBottomTabBarrier = addDocumentTabBarrier(TabBarrierPosition.bottom, actionBarRef.current);
      // Set overflow: hidden to html tag so page content under the mobile menu is not scrollable
      const removeScrollPrevention = addDocumentScrollPrevention(actionBarRef.current);

      return () => {
        removeTopTabBarrier();
        removeBottomTabBarrier();
        removeScrollPrevention();
      };
    }

    // Returning null from useEffect is prohibited, but undefined is fine
    return undefined;
  }, [actionBarRef, mobileMenuOpen]);

  const logoProps: LinkProps = {
    'aria-label': logoAriaLabel,
    href: logoHref,
    className: classNames(styles.titleAndLogoContainer, styles.logo),
    onClick: handleLogoClick,
    onKeyPress: handleLogoKeyPress,
  };

  const titleProps: LinkProps = {
    'aria-label': titleAriaLabel,
    href: titleHref,
    className: classNames(styles.titleAndLogoContainer, styles.title, styles[titleStyle]),
    onClick: onTitleClick,
    onKeyPress: handleLogoKeyPress,
  };

  if (!(titleProps.href || titleProps.onClick)) {
    titleProps.role = titleAriaLabel && 'img';
  } else {
    titleProps.onKeyPress = handleKeyPress;
    titleProps.onClick = handleClick;
  }

  const childrenLeft = Array.isArray(children)
    ? children.filter(
        (item) => React.isValidElement(item) && !(item.props as HeaderActionBarItemProps).fixedRightPosition,
      )
    : [children];
  const childrenRight = Array.isArray(children)
    ? children.filter(
        (item) => React.isValidElement(item) && !!(item.props as HeaderActionBarItemProps).fixedRightPosition,
      )
    : [];
  const { children: lsChildren, props: lsProps, componentExists } = getLanguageSelectorComponentProps(children);
  const languageSelectorChildren = useMemo(() => {
    return lsChildren ? getChildElementsEvenIfContainersInbetween(lsChildren) : null;
  }, [lsChildren]);
  return (
    <>
      {mobileMenuOpen && (
        <ContentTabBarrier onFocus={() => focusToActionBar(TabBarrierPosition.bottom, actionBarRef.current)} />
      )}
      <div
        className={classNames(styles.headerActionBarContainer, mobileMenuOpen && styles.mobileMenuContainer)}
        ref={actionBarRef}
      >
        <div className={classNames(styles.headerActionBar, className)} role={role} aria-label={ariaLabel}>
          <HeaderActionBarLogo logo={logo} logoProps={logoProps} />
          {title && (
            <LinkItem {...titleProps}>
              <span className={classNames(styles.title)}>{title}</span>
            </LinkItem>
          )}
          <div className={styles.headerActions}>
            {componentExists && (
              <HeaderLanguageSelectorConsumer {...lsProps}>{languageSelectorChildren}</HeaderLanguageSelectorConsumer>
            )}
            {childrenLeft}
            <HeaderActionBarMenuItem ariaLabel={menuButtonAriaLabel} onClick={onMenuClick} />
            {childrenRight.length > 0 && (
              <>
                <hr aria-hidden="true" />
                {childrenRight}
              </>
            )}
          </div>
        </div>
        {isNotLargeScreen && (
          <HeaderActionBarNavigationMenu
            frontPageLabel={frontPageLabel}
            titleHref={titleHref}
            logo={logo}
            logoProps={logoProps}
            openFrontPageLinksAriaLabel={openFrontPageLinksAriaLabel}
          />
        )}
      </div>
      {componentExists && (
        <HeaderLanguageSelectorConsumer {...lsProps} fullWidthForMobile>
          {languageSelectorChildren}
        </HeaderLanguageSelectorConsumer>
      )}
      {mobileMenuOpen && (
        <ContentTabBarrier onFocus={() => focusToActionBar(TabBarrierPosition.top, actionBarRef.current)} />
      )}
    </>
  );
};

HeaderActionBar.defaultProps = {
  titleStyle: TitleStyleType.Normal,
};
