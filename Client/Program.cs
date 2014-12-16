using Keyroll.Shell;
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

            var runtime = Runtime.Instance;
            var router = new Router();
            router.Add(new ClientKVMShell());
            runtime.Router = router;

            var main_ui = new MainUI();
            var window = new Window(main_ui);
            window.IsSizeLocked = false;
            window.Show();

            Application.Run();

            var storage = Runtime.Instance.Storage;
            if (storage != null)
                storage.Close();
        }
    }
}
