import {UserType} from '../../types/outputs/user/user';
import {SchoolType} from '../../types/outputs/school/school';
import {ClassType} from '../../types/outputs/class/class';
import {NavigationItemType} from "../../types/outputs/core/config/navigation/navigation-item";
import {BadgeType} from "../../types/outputs/core/config/navigation/badge/badge";
import {ConfigType} from "../../types/outputs/core/config/config";

export const OutputDef = [
  UserType,
  SchoolType,
  ClassType,
  ConfigType,
  NavigationItemType,
  BadgeType
].join('\n');
