import {Class, User} from "../../../../models";
import {ROLE_ADMIN, ROLE_SCHOOL_ADMIN, ROLE_STUDENT, ROLE_TEACHER} from "../../../../constants/user-roles";

/**
 * @param contextUser{User}
 * @returns [any]
 */
export async function ConfigGet(contextUser) {
  const findUser = await User.findById(contextUser.id).populate('school');

  const userClasses = await getUserClasses(findUser);

  return {
    navigationItems: [
      {
        id: 'navigation',
        title: 'Navigation',
        type: 'group',
        icon: 'feather icon-monitor',
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: 'feather icon-home',
            breadcrumbs: false
          },
          {
            id: 'classes',
            title: 'Classes',
            type: 'collapse',
            url: '/classes',
            icon: 'feather icon-layout',
            breadcrumbs: true,
            children: [
              {
                id: 'all_classes',
                title: 'All Classes',
                type: 'item',
                url: '/classes',
                icon: 'feather icon-layout',
                breadcrumbs: true,
              }
            ].concat(userClasses.map(uC => ({
              id: 'class_' + uC._id,
              title: uC.name,
              type: 'item',
              url: '/classes/' + uC._id,
              icon: 'feather icon-home',
              breadcrumbs: true
            })))
          }
        ]
      }
    ]
  };
}

/**
 * @param user{User}
 * @returns [Class]
 */
async function getUserClasses(user) {
  switch (user.role) {
    case ROLE_ADMIN:
      return Class.find({});
    case ROLE_SCHOOL_ADMIN:
      return Class.find({
        school: user.school
      });
    case ROLE_TEACHER:
    case ROLE_STUDENT:
      return Class.find({
        school: user.school,
        $or: [{teachers: {$in: user.id}}, {students: {$in: user.id}}]
      });
  }
}

