using Sartrey.UI.WinForms;
using System;
using System.Windows.Forms;

namespace Keyroll
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            var main_ui = new MainUI();
            var window = new Window(main_ui);
            window.Show();
            Application.Run();
        }
    }
}
